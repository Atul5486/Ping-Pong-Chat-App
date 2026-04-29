import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser} from "../lib/api";


export const Uselogin=()=>{
    const queryClient=useQueryClient();
    const {mutate,isPending,error}=useMutation({
        mutationFn:loginUser,
        onSuccess:()=>queryClient.invalidateQueries({queryKey:['authUser']}
        )
    })

    return {loginMutation:mutate,isPending,error};
}
