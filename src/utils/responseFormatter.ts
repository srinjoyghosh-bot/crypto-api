interface ApiResponse<T> {
  success: boolean;
  error?: string;
  message?: string;
  data?: T;
}

export const formatResponse = <T>(
  success: boolean,
  data?: T,
  message?: string,
  error?: string
): ApiResponse<T> => {
  return {
    success,
    error,
    message,
    data,
  };
};
