export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between items-center text-sm text-white/60 gap-4">
        
        <div>
          © {new Date().getFullYear()} Shynvo
        </div>

        <div className="flex items-center gap-2">
          <span>Contact:</span>
          <a
            href="mailto:hi@shynvo.app"
            className="text-white hover:underline"
          >
            hi@shynvo.app
          </a>
        </div>

      </div>
    </footer>
  );
}
