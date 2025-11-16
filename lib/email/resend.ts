import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDonationConfirmation({
  email,
  campaignName,
  amount,
  isMonthly = false,
}: {
  email: string;
  campaignName: string;
  amount: number;
  isMonthly?: boolean;
}) {
  const subject = isMonthly
    ? `Thank you for your monthly sponsorship!`
    : `Thank you for your donation!`;

  const message = isMonthly
    ? `Your monthly sponsorship of $${(amount / 100).toFixed(2)} to support ${campaignName} has been set up successfully. You'll be charged on the same day each month.`
    : `Your donation of $${(amount / 100).toFixed(2)} to support ${campaignName} has been received. Thank you for making a difference!`;

  try {
    const data = await resend.emails.send({
      from: 'Path2Better <notifications@path2better.com>',
      to: [email],
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2B6CB0;">Thank You for Your Support!</h1>
          <p>${message}</p>
          <p>Your generosity helps provide transparent, agency-verified support to community members on their path to stable housing and employment.</p>
          <hr style="border: 1px solid #E2E8F0; margin: 24px 0;" />
          <p style="color: #718096; font-size: 14px;">
            Path2Better<br/>
            Community-powered pathways forward<br/>
            Peterborough, Ontario
          </p>
        </div>
      `,
    });

    return data;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}
