<template>
  <section>
    <app-header></app-header>
    <div class="container mt-5">
      <div
        class="btn btn-warning bg-success text-center col-md-6 mx-auto text-white"
        v-if="finish"
        @click="rePlay"
      >
        <h5>Oyun Bitti Yeniden Başlamak İçin Tıklayın</h5>
      </div>

      <div v-if="!finish" class="col-md-6 mx-auto">
        <div @click="clickGame(0, 0)" class="grid-item">{{ game[0][0] }}</div>
        <div @click="clickGame(0, 1)" class="grid-item">{{ game[0][1] }}</div>
        <div @click="clickGame(0, 2)" class="grid-item">{{ game[0][2] }}</div>
        <div @click="clickGame(1, 0)" class="grid-item">{{ game[1][0] }}</div>
        <div @click="clickGame(1, 1)" class="grid-item">{{ game[1][1] }}</div>
        <div @click="clickGame(1, 2)" class="grid-item">{{ game[1][2] }}</div>
        <div @click="clickGame(2, 0)" class="grid-item">{{ game[2][0] }}</div>
        <div @click="clickGame(2, 1)" class="grid-item">{{ game[2][1] }}</div>
        <div @click="clickGame(2, 2)" class="grid-item">{{ game[2][2] }}</div>
      </div>
    </div>
    {{ user }}
  </section>
</template>

<script>
import Header from "./Header";
export default {
  data() {
    return {
      game: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      user: "",
      finish: false,
    };
  },
  methods: {
    clickGame(x, y) {
      if (this.user.attack == "X" && this.game[x][y] == "" && this.user.turn) {
        this.game[x][y] = "X";
      }
      if (this.user.attack == "O" && this.game[x][y] == "" && this.user.turn) {
        this.game[x][y] = "O";
      }
      this.$socket.emit("attack", { user: this.user, game: this.game });
      this.$forceUpdate(); // 2 Boyutlu Diziler vs güncellemek için
    },
    rePlay() {
      this.$socket.emit("restart");
      this.user = "";
      (this.game = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]),
        this.$router.push({ name: "login" });
    },
  },

  sockets: {
    newGame(data) {
      console.log("Newgame");
      this.user = data;
    },
    turn(data) {
      console.log(data);
      this.user.turn = data;
    },
    game(data) {
      this.game = data;
    },
    finish() {
      this.finish = true;
    },

    restart(data) {
      console.log(data);

      this.rePlay();
    },
  },

  created() {
    this.$socket.emit("newGame", this.game);
  },

  components: {
    appHeader: Header,
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/home.scss";
</style>