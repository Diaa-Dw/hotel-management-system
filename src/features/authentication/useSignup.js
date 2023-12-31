import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export const useSignup = () => {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupApi({ fullName, email, password }),
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        "Account successfully created. please verufy the new account from the user's email address"
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signup, isLoading };
};
