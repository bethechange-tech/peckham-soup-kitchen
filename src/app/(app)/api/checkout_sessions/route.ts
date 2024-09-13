import { type NextRequest, type NextResponse } from 'next/server';
import { HandlerFunctionWrapper } from '@/lib/handler-wrapper';
import { stripe } from '@/lib/stripe';

interface DonationForm {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  donationAmount: string;
  frequency: 'one-time' | 'monthly';
}

export const POST = HandlerFunctionWrapper(
  async (req: NextRequest, _res: NextResponse) => {
    const body = (await req.json() || {}) as DonationForm
    const client_reference_id = body.formData.phoneNumber + Date.now().toFixed()

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: body.formData.email,
      client_reference_id,
      metadata: { ...body.formData },
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'donation',
              images: ['https://res.cloudinary.com/duueci0ry/image/upload/v1722384270/download_fowi9a.png'],
            },
            unit_amount: Number(body.donationAmount) * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/bookings/${client_reference_id}`,
    });

    return Response.json(session)
  }
);


