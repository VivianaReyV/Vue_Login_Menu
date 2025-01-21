<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="login-form" style="width: 100%; max-width: 400px;">
      <h2 class="text-center mb-4">Ingresar al sistema</h2>
      <form @submit.prevent="handleLogin">
        <!-- Username input -->
        <div class="mb-3">
          <label for="username" class="form-label">Nombre de usuario</label>
          <input
            v-model="username"
            type="text"
            id="username"
            class="form-control"
            placeholder="nombre de usuario"
            required
          />
        </div>

        <!-- Password input -->
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="form-control"
            placeholder="contraseña"
            required
          />
        </div>

        <!-- Error message -->
        <div v-if="errorMessage" class="text-danger mb-3">
          {{ errorMessage }}
        </div>

        <!-- Submit button -->
        <div class="d-grid">
          <button type="submit" class="btn btn-primary">Ingresar</button>
        </div>
      </form>
      <div class="text-center mt-3">
        <small>No tienes una cuenta? <a href="#">Regístrate</a></small>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from "@/services/auth";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",  
    };
  },
  methods: {
    async handleLogin() {
      try {
        const credentials = {
          username: this.username,
          password: this.password,
        };
        const response = await authService.login(credentials);
        const decrypted = JSON.parse(response.encrypted);

        if (decrypted.status) {
          const userData = {
            username: decrypted.data.username,
            nombre: decrypted.data.nombre,
            email: decrypted.data.email,
            operaciones: decrypted.data.operaciones.map(op => op.nombreRolOperacion),
          };
          localStorage.setItem("user", JSON.stringify(userData));
          this.$router.push("/dashboard");
        } else {
          this.errorMessage = "Credenciales inválidas"; 
        }
      } catch (error) {
        console.error("Error en el login:", error);
        this.errorMessage = "Error en el servicio de autenticación."; 
      }
    },
  },
};
</script>

<style scoped>
html, body {
  height: 100%;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-form {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 576px) {
  .login-form {
    box-shadow: none;
    border: none;
    padding: 15px;
  }
}
</style>
