import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const event = body.meta?.event_name;
    const data = body.data;

    console.log("LEMON WEBHOOK:", event);

    if (event === "order_created") {
      const status = data.attributes?.status;

      if (status === "paid") {
        const email = data.attributes?.user_email;
        const product = data.attributes?.first_order_item?.product_name;

        console.log("PAID:", email, product);

        // TODO: connect this to your user system later
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
