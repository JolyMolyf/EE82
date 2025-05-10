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
import { registerUser, loginUser } from "../utils"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../lib/hooks"
import { setUser, setLoading, setError } from "../../lib/features/auth/authSlice"
import { useRouter } from "next/navigation"

export const RegisterForm = ({className, ...props}: React.ComponentPropsWithoutRef<"div">) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, error } = useAppSelector((state) => state.auth);

    const handleRegister = async (e:any) => {
        e.preventDefault();
        dispatch(setLoading(true));
        if (!email || !password || !firstname || !lastname) {
            dispatch(setError('Please fill in all fields'));
            dispatch(setLoading(false));
            return;
        }
        const res = await registerUser(email, password, firstname, lastname);
        if(!res.success){
            dispatch(setError(res?.error || 'Nie udało się zarejestrować użytkownika'));
        } else {
            // After successful registration, log the user in
            const loginRes = await loginUser(email, password);
            if (loginRes.user) {
                dispatch(setUser(loginRes.user));
                router.push('/'); // Redirect to home page after successful registration
            }
        }
        dispatch(setLoading(false));
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your details below to register to your account and post your car for sale
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="firstname">Imie</Label>
                </div>
                <Input 
                  id="firstname" 
                  type="text" 
                  required 
                  name="firstname" 
                  value={firstname} 
                  onChange={(e) => setFirstname(e.target.value)} 
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="lastname">Nazwisko</Label>
                </div>
                <Input 
                  id="lastname" 
                  type="text" 
                  required 
                  name="lastname" 
                  value={lastname} 
                  onChange={(e) => setLastname(e.target.value)} 
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                onClick={handleRegister}
                disabled={loading}
              >  
                {loading ? 'Loading...' : 'Register'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
                Have an account?{" "}
              <a href="/auth/login" className="underline underline-offset-4">
                Zaloguj się
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    )
}

export default RegisterForm;