import { CognitoIdentityProviderClient, SignUpCommand, ConfirmSignUpCommand, ResendConfirmationCodeCommand } from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function sendOTP(email: string, domain: string) {
  try {
    const command = new SignUpCommand({
      ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      Username: email,
      Password: generateTempPassword(), // Cognito requires a password even for OTP
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "custom:domain", Value: domain },
      ],
    });

    await client.send(command);
    return { success: true };
  } catch (error) {
    if ((error as any).name === "UsernameExistsException") {
      // If user exists, resend the code
      const resendCommand = new ResendConfirmationCodeCommand({
        ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
        Username: email,
      });
      await client.send(resendCommand);
      return { success: true };
    }
    throw error;
  }
}

export async function verifyOTP(email: string, code: string) {
  const command = new ConfirmSignUpCommand({
    ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
    Username: email,
    ConfirmationCode: code,
  });

  await client.send(command);
  return { success: true };
}

// Helper function to generate a temporary password
function generateTempPassword() {
  return Math.random().toString(36).slice(-8) + 
         Math.random().toString(36).toUpperCase().slice(-4) + 
         Math.random().toString(10).slice(-4);
}