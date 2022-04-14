<template>
    <header>

      <div style="width: 100px;">
            <router-link to="/"><img src="img/cine.png"></router-link>
            <span>Ciné</span>
        </div>
      
      <div class="search">
          <div class="input">
            <img src="img/search.png">
            <input id="searchtext" type="text" placeholder="Rechercher un film" v-model="query" v-on:keyup="recherche" v-on:change="recherche" v-on:focus="show" autocomplete="false">
          </div>
            <br>

          <table class="result" v-if="show_result">
              <tr v-for='film in films' v-bind:key="film.key" class="overmouse" v-on:click="showDetails(film)">
                  <td v-if="film.poster_path"><img v-bind:src="'http://image.tmdb.org/t/p/w500' + film.poster_path"></td>
                  <td>{{ film.title }} </td>
              </tr>
          </table>

      </div>
      
      <div style="width: 120px;">
      </div>

    </header>
  <router-view/>
</template>



<script>
import axios from 'axios'

  export default {
    name: 'App',
    data() {
        return {
            baseUrl: 'https://api.themoviedb.org/3',
            films: [],

            query: '',
            api_key: '9021264f48ddf90a2c1bf9c58af5d837',
            show_result: false,
        }
    },
    methods: {
        async recherche() {
          if (this.query.length == 0){
            this.show_result = false;

          } else {
            const response = await axios.get(this.baseUrl + '/search/movie?language=fr&api_key=' + this.api_key + '&query=' + this.query);
            this.films = await response.data.results;
            this.show_result = true;
          }
        },
        showDetails(film) {
          
          this.$router.push({
              path: 'Details', query: {
                  id: film.id
              }
              
          });

          this.show_result = false;
        
        },
        show() {
          this.show_result = true;        
        },
        hide() {
          this.show_result = false;        
        }
    }
    
  }

</script>
