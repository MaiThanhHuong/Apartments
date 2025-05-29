import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building } from "lucide-react";

export function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log({ username, password }); // Debug log like handleSubmit

    // Kiểm tra rỗng
    if (!username || !password) {
      alert("❌ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        alert("✅ Đăng nhập thành công!");
        setUsername(""); // Reset username field
        setPassword(""); // Reset password field
        const role = data.user.role;
        if (role === "admin") {
          navigate("/dashboard");
        } else if (role === "ketoan") {
          navigate("/billing");
        } else {
          alert("❌ Vai trò không hợp lệ.");
        }
      } else {
        alert("❌ Lỗi: " + (data.message || "Đăng nhập thất bại."));
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setIsLoading(false);
      alert("❌ Lỗi kết nối đến server.");
    }
  };

  return (
    <Card className="w-[350px] md:w-[450px]">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
            <Building className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>

        <CardTitle className="text-2xl">BLUE MOON</CardTitle>

        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;