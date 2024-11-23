interface AsyncWrapperError {
  success: false;
  message: string;
}

interface AsyncWrapperSuccess<T> {
  result: T;
  success: true;
}

export type asyncWrapperResponse<T> = AsyncWrapperSuccess<T> | AsyncWrapperError;

export const asyncWrapper = async <T>(
  callback: () => Promise<T>
): Promise<asyncWrapperResponse<T>> => {
  try {
    const result = await callback();
    return { success: true, result };
  } catch (error: any) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
};
