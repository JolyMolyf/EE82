'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUser } from "../utils"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../lib/hooks"
import { setUser, setLoading, setError } from "../../lib/features/auth/authSlice"
import { useRouter } from "next/navigation"

export const LoginForm = ({className, ...props}: React.ComponentPropsWithoutRef<"div">) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, error } = useAppSelector((state) => state.auth);

    const handleLogin = async (e:any) => {
        e.preventDefault();
        dispatch(setLoading(true));
        if (!email || !password) {
            dispatch(setError('Please enter email and password'));
            dispatch(setLoading(false));
            return;
        }
        const res = await loginUser(email, password);
        if(!res.user){
            dispatch(setError(res.errors.map((error:any) => error.message).join(', ')));
        } else {
            dispatch(setUser(res.user));
            router.push('/'); // Redirect to home page after successful login
        }
        dispatch(setLoading(false));
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Wpisz swoje dane poniżej aby zalogować się na swoje konto
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Hasło</Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  name="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                onClick={handleLogin} 
                disabled={loading}
              >  
                {loading ? 'Loading...' : 'Login'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
                    Nie masz konta? {" "}
              <a href="/auth/register" className="underline underline-offset-4">
                Zarejestruj się
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    )
}

export default LoginForm;