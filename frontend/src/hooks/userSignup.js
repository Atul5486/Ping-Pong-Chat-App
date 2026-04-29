import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registeruser } from "../lib/api";


export const UserSignup=()=>{
    const queryClient=useQueryClient();
    const {mutate,isPending,error}=useMutation({
        mutationFn:registeruser,
        onSuccess:()=>queryClient.invalidateQueries({queryKey:['authUser']}
        )
    })

    return {signupMutation:mutate,isPending,error};
}
