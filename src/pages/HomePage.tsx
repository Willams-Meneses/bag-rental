import AuthModal from "@/components/sections/auth/AuthModal"
import LoginForm from "@/components/sections/auth/LoginForm"
import { Checkbox, TextField } from "@mui/material"

const HomePage = () => {
  return (
    <div>
      HomePage
      <div style={{
        display: "flex",
        alignItems: "flex-start"
      }}>
        <TextField placeholder="Test Input" />
        <Checkbox />
      </div>

      Form login

      <div style={{
        marginTop: "20px"
      }}>
        <LoginForm />
      </div>

      <AuthModal />

    </div>
  )
}

export default HomePage