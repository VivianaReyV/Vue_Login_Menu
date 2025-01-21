<template>
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar -->
        <div
            id="sidebar"
            :class="{
                'mobile-visible': isMobileMenuOpen,
                'mobile-hidden': !isMobileMenuOpen && isMobile
            }"
        >
          <div class="sidebar-sticky">
            <h4>Bienvenido, <span class="text-primary">{{ user.nombre }}</span></h4>
            <p>{{ user.email }}</p>
  
            <!-- Menús -->
            <div v-for="(menu, key) in menus" :key="key" class="menu-category">
              <h5>{{ key }}</h5>
              <div class="list-group">
                <router-link
                  v-for="item in menu"
                  :key="item.route"
                  :to="item.route"
                  class="list-group-item list-group-item-action"
                  @click="closeMobileMenu"
                >
                  <i class="material-icons me-2">{{ item.icon }}</i>
                  {{ item.name }}
                </router-link>
              </div>
            </div>
  
            <!-- Botón de cerrar sesión -->
            <button @click="logout" class="btn btn-danger w-100">
              <i class="material-icons">logout</i> Cerrar sesión
            </button>
          </div>
        </div>
  
        <!-- Main Content -->
        <div :class="['main-content', {'sidebar-collapsed': !sidebarVisible}]">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Dashboard</h2>
            <button
              class="btn btn-primary d-md-none"
              @click="toggleMobileMenu"
            >
              ☰
            </button>
          </div>
  
          <!-- Dynamic Content -->
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

  
<script>
export default {
  data() {
    return {
      user: null,
      menus: {},
      sidebarVisible: true,
      isMobileMenuOpen: false,
    };
  },
  computed: {
    isMobile() {
      return window.innerWidth <= 767; 
    }
  },
  mounted() {
    window.addEventListener("resize", this.updateIsMobile);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateIsMobile);
  },
  created() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      this.user = storedUser;
      this.menus = this.generateMenus(storedUser.operaciones);
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    generateMenus(operaciones) {
      const allMenus = {
        Usuarios: [
          { name: "Administrar usuarios", route: "/users-index/false", operacion: "users%user%index", icon: "person" },
          { name: "Administrar perfiles", route: "/roles-index", operacion: "roles%roles%index", icon: "people" },
          { name: "Administrar operaciones", route: "/operations-index", operacion: "roles%roles-operaciones%index", icon: "build" }
        ],
        Correspondencia: [
          { name: "Distribución y Envío", route: "/distribution-shipping-index", operacion: "radicacion%distribuciony-envio%index", icon: "dynamic_feed" },
          { name: "Reasignación masiva", route: "/mass-reassignment-index", operacion: "radicacion%reasignacion-radicado%index", icon: "library_add_check" },
          { name: "Anulación", route: "/annulment-index", operacion: "radicacion%anulacion%index", icon: "pan_tool" }
        ],
        Radicación: [
          { name: "Radicación estándar", route: "/filing-index/false", operacion: "radicacion%radicados%index", icon: "description" },
          { name: "Radicación correo e.", route: "/filing-email-index", operacion: "radicacion%radicacion-email%login-email", icon: "contact_mail" }
        ]
      };
  
      const menus = {};
      for (let category in allMenus) {
        const categoryMenus = allMenus[category].filter(item =>
          operaciones.includes(item.operacion)
        );
        if (categoryMenus.length > 0) {
          menus[category] = categoryMenus;
        }
      }
  
      return menus;
    },
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
    updateIsMobile() {
      if (!this.isMobile) {
        this.isMobileMenuOpen = false;
      }
    },
  }
};
</script>

  
<style scoped>

*,
*::before,
*::after {
  box-sizing: border-box; 
}

body, html {
  overflow-x: hidden; 
}

#sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 20px;
  background-color: #f8f9fa;
  position: fixed;
  left: 0;
  top: 0;
  width: 250px; 
  max-width: 250px; 
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1000;
  transform: translateX(-100%);
}

#sidebar.mobile-hidden {
  transform: translateX(-100%);
}

#sidebar.mobile-visible {
  transform: translateX(0);
}

.sidebar-sticky {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%; 
  padding-right: 15px; 
}

.menu-category h5 {
  margin-bottom: 10px;
  font-size: 16px;
  color: #6c757d;
}

.list-group-item {
  font-size: 14px;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  transition: background-color 0.3s;
  width: 100%; 
  white-space: nowrap;
  display: flex; 
  align-items: center;
}

.list-group-item:hover {
  background-color: #e9ecef;
}

.btn {
  margin-top: 20px;
  width: 100%; 
  white-space: nowrap; 
}

.main-content {
  margin-left: 280px;
  padding: 20px;
  transition: margin-left 0.3s ease;
  overflow-x: hidden;
}

.sidebar-collapsed {
  margin-left: 0;
}

@media (min-width: 768px) {
  #sidebar {
    transform: translateX(0) !important;
    position: fixed;
    width: 280px;
    max-width: 280px; 
    overflow-x: hidden; 
    padding: 20px;
  }

  .main-content {
    margin-left: 280px; 
  }

  .btn.btn-primary.d-md-none {
    display: none; 
  }
}

@media (max-width: 767px) {
  #sidebar {
    transform: translateX(-100%);
    height: 100%;
    overflow-y: auto;
    position: fixed;
    width: 280px;
    max-width: 280px;
  }

  #sidebar.mobile-visible {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
  }

  .btn.btn-primary.d-md-none {
    display: inline-flex; 
    padding: 10px 15px;
    font-size: 18px;
    text-align: center;
    width: 60px; 
    height: 60px; 
    justify-content: center; 
    align-items: center; 
    margin: 0; 
    position: absolute; 
    top: 10px;
    right: 30px; 
    z-index: 1100; 
  }
}

</style>

  