function extractPublicId(optimizeUrl) {
    // Remove query parameters and the 'f_auto,q_auto/v1/' part
    const urlWithoutQuery = optimizeUrl.split('?')[0];  // Remove query params if any
    const urlWithoutPrefix = urlWithoutQuery.replace('/upload/f_auto,q_auto/v1/', '/upload/');  // Remove 'f_auto,q_auto/v1/'
  
    // Extract the public ID by splitting after '/upload/' and removing the file extension
    const publicIdWithExtension = urlWithoutPrefix.split('/upload/')[1];
    return publicIdWithExtension.split('.')[0];
  }
  
  module.exports = {
    extractPublicId
  }