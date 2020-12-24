<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 col-sm-8 col-xl-6 mx-auto w-75">
        <div class="card">
          <div class="card-header text-center">
            <h3 class="text-uppercase">Login</h3>
          </div>
          <div class="card-body text-center">
            <input
              type="text"
              class="form-control"
              placeholder="Nickname"
              v-model="user.nickname"
            />

            <button
              @click.prevent="postLogin"
              class="btn btn-outline-primary btn-block"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        nickname: "",
      },
    };
  },
  methods: {
    postLogin() {
      this.$socket.emit("login", this.user);
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  padding: 2rem;
  border-top-left-radius: 2rem;

  .card-header {
    padding: 1rem;
    background: #f2f2f2;
    border-radius: 1rem;
    color: orange;
    font-weight: bold;
    letter-spacing: 0.1rem;
  }
  .card-body {
    input {
      margin-bottom: 1rem;
      outline: none;
      border: none;
    }

    button {
      &:hover {
        background-color: orange;
      }
    }
  }
}
</style>