
// Helper function to safely append or update signature in email body
export const updateSignatureInBody = (body: string, signature: string) => {
  if (!signature.trim()) {
    return body;
  }
  
  // Remove any existing signature
  const bodyWithoutSignature = removeSignatureFromBody(body, signature);
  
  // Add the signature with appropriate spacing
  return bodyWithoutSignature.trim() 
    ? bodyWithoutSignature.trim() + '\n\n' + signature
    : signature;
};

// Helper function to remove existing signature from email body
export const removeSignatureFromBody = (body: string, signature: string) => {
  if (!signature.trim() || !body.includes(signature)) {
    return body;
  }
  
  // Find the last occurrence of the signature and remove it
  const signatureIndex = body.lastIndexOf(signature);
  if (signatureIndex !== -1) {
    return body.substring(0, signatureIndex).replace(/\n+$/, '');
  }
  
  return body;
};
