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
import { loginUser, registerUser } from "../utils"
import { useState } from "react"

export const LoginForm = ({className, ...props}: React.ComponentPropsWithoutRef<"div">) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async (e:any) => {
        e.preventDefault();
        setIsLoading(true);
        if (!email || !password) {
            setError('Please enter email and password');
            return;
        }
        const res = await loginUser(email,password);
        if(!res.user){
            setError(res.errors.map((error:any) => error.message).join(', '));
        }
        setIsLoading(false);
        // registerUser(
        //     'adrewtate@gmail.com',
        //     'seradmin123'
        // )
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
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input id="password" type="password" required name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" onClick={handleLogin} disabled={isLoading}>  
                {isLoading ? 'Loading...' : 'Login'}
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