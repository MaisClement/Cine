<template>
    <div class="details">
        <div class="content">

            <div class="settings-head">
				<div>
					<table>
						<tr>
							<td v-if="people.profile_path">
                                <img class="icone" v-bind:src="'http://image.tmdb.org/t/p/w500' + people.profile_path">
                            </td>
							<td>
								<h2>{{people.name}}</h2>
                                <p>{{people.biography}}</p>
                            </td>
						</tr>
                    </table>

                    <table>
						<tr>
							<td class="bio">
                                <p>
                                    <img src="img/red-carpet.png"> <h3>Connu pour</h3>
                                        <br>
                                    {{people.known_for_department}}
                                </p>

                                <p>
                                    <img src="img/easter-cake.png"> <h3>Naissance</h3>
                                        <br>
                                    {{people.birthday}}
                                        <br>
                                    <i>{{people.place_of_birth}}</i>
                                </p>
                                
                                <p v-if="people.deathday">
                                    <img src="img/cross.png"> <h3>Décés</h3>
                                        <br>
                                    {{people.deathday}}
                                </p>

                                <p>
                                    <img src="img/mars-symbol.png"> <h3>Sexe</h3>
                                        <br>
                                    {{people.gender == 1 ? 'Femme' : 'Homme'}}
                                </p>

                                

                                <p>
                                    <img src="img/two-hearts.png"> <h3>Popularité</h3>
                                        <br>
                                    {{people.popularity}}
                                </p>

                            </td>
							<td class="back">
								<h2>Connu pour</h2>
                                <table class="cast" v-for='credit in credits.cast' v-bind:key="credit.key">
                                    <tr>
                                        <td v-if="credit.poster_path"><img class="profile" v-bind:src="'http://image.tmdb.org/t/p/w500' + credit.poster_path"></td>
                                        <td>
                                            <b class="linkwhite" v-on:click="showDetails(credit.id)">
                                                {{ credit.title }}
                                            </b>
                                                <br>
                                            {{ credit.character }}
                                        </td>
                                    </tr>
                                </table>
                            </td>
						</tr>
                    </table>

                    

				</div>
			</div>

            
                        
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default{
    name: 'Details',
    data: () => ({
        baseUrl: 'https://api.themoviedb.org/3',
        api_key: '9021264f48ddf90a2c1bf9c58af5d837',
        people: [],
        credits: [],
    }),
    methods: {
        async getpeople() {
            const response = await axios.get(this.baseUrl + '/person/' + this.id + '?language=fr&api_key=' + this.api_key);
            this.people = await response.data; 
        },
        async getcredits() {
            const response = await axios.get(this.baseUrl + '/person/' + this.id + '/movie_credits?language=fr&api_key=' + this.api_key);
            this.credits = await response.data;  
        },
        showDetails(film) {
          this.$router.push({
              path: 'Details', query: {
                  id: film
              }
          });
        },
    },
    created() {
        this.id = this.$route.query.id;
        
        this.getpeople();
        this.getcredits();
    }
}
  
</script>
