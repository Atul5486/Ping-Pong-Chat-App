import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser} from "../lib/api";


export const Uselogout=()=>{
    const queryClient=useQueryClient();
    const {mutate,isPending,error}=useMutation({
        mutationFn:logoutUser,
        onSuccess:async ()=>{
            await queryClient.invalidateQueries({queryKey:["authUser"]});
            queryClient.removeQueries()
            window.location.href="/login";
        }
    })

    return {logoutMutation:mutate,isPending,error};
}
