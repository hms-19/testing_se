import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { axiosPost } from "utils/axios";
import { setAuth } from "store/features/auth/auth.slice";
import { deleteLocalStorage, validateToken } from "utils/local-storage";
import { ADMIN_ACCESS_ROUTES } from "utils/roles";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state: any) => state.auth)
  const pathname = usePathname()

  // const authVerify = async (token: string | null) => {
  //   if (token) {
  //     await axiosPost(
  //       "auth/verify",
  //       { token },
  //       (res: any) => {
  //         dispatch(setAuth({token: res.token, role_type: res.role_type}));
  //         if (res.role_type != 0) {
  //           if(ADMIN_ACCESS_ROUTES.some(route => pathname.startsWith(route))){
  //             router.push('/unauthorized'); 
  //           }
  //         }
  //       },
  //       () => {
  //         dispatch(setAuth({}));
  //         deleteLocalStorage("token").then(() => {
  //           router.push("/auth/sign-in");
  //         });
  //       }
  //     );
  //   }
  // };

  useEffect(() => {
    const token = validateToken();
    if (!token) {
      router.push("/auth/sign-in");
    }
    // authVerify(token);
  }, []); 


  // useEffect(() => {
  //   if (auth.role_type != 0) {
  //     if(ADMIN_ACCESS_ROUTES.some(route => pathname.startsWith(route))){
  //       router.push('/unauthorized'); 
  //     }
  //   }
  // },[])

  return <>{children}</>;
}
