import time
from app.alerts.notify import send_alert
from app.audit.logger import audit_log

REQUEST_LOG = {}
LOCKED_KEYS = set()
LOCK_EXPIRY = {}

MAX_REQUESTS_PER_MIN = 120
MAX_TOKENS_PER_HOUR = 50_000
LOCK_DURATION_SECONDS = 60 * 60  # 1 hour

def is_locked(api_key: str) -> bool:
    if api_key in LOCKED_KEYS:
        if time.time() > LOCK_EXPIRY.get(api_key, 0):
            LOCKED_KEYS.remove(api_key)
            LOCK_EXPIRY.pop(api_key, None)
            audit_log(event="API_KEY_AUTO_UNLOCK", actor=api_key)
            return False
        return True
    return False

def record_request(api_key: str, tokens: int):
    now = time.time()
    log = REQUEST_LOG.setdefault(api_key, {"requests": [], "tokens": []})

    log["requests"].append(now)
    log["tokens"].append((now, tokens))

    # keep last 60 seconds of requests
    log["requests"] = [t for t in log["requests"] if now - t < 60]
    # keep last 1 hour of token usage
    log["tokens"] = [(t, tok) for t, tok in log["tokens"] if now - t < 3600]

    _check_abuse(api_key, log)

def _check_abuse(api_key: str, log: dict):
    if len(log["requests"]) > MAX_REQUESTS_PER_MIN:
        lock_key(api_key, "Too many requests per minute")

    total_tokens = sum(tok for _, tok in log["tokens"])
    if total_tokens > MAX_TOKENS_PER_HOUR:
        lock_key(api_key, "Token usage spike")

def lock_key(api_key: str, reason: str):
    if api_key in LOCKED_KEYS:
        return

    LOCKED_KEYS.add(api_key)
    LOCK_EXPIRY[api_key] = time.time() + LOCK_DURATION_SECONDS

    audit_log(
        event="API_KEY_LOCKED",
        actor=api_key,
        metadata={"reason": reason, "lock_minutes": LOCK_DURATION_SECONDS // 60},
    )

    send_alert(
        title="API Key Locked",
        message=f"Key {api_key[:6]}*** locked. Reason: {reason}",
    )
