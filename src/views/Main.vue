<template>
    <div class="col-10 col-sm-10 col-lg-10">
        <div class="row align-items-center mt-3">
            <div class="col">
                <strong class="fs-4">Home</strong>
            </div>
        </div>
        <div class="row align-items-center mt-3">
            <form class="form-inline">
                <input class="form-control mr-sm-2" type="search" placeholder="Search for People/Events" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
        <div class="row mt-3">
            <profilecard 
                v-for="user in users" 
                :key="user.id"
                :name="user.name"
                :major="user.major"
                :year="user.year"
                :interests="user.interests"
            />           
        </div>
        

    </div>
</template>

<script>
import profilecard from '../components/profilecard.vue'

export default {
    components: {
        profilecard
    },

    data() {
        return {
            // Array to store all users in database
            // To Include img src as well
            users: [
                {
                    id: 'sclim.2021@smu.edu.sg',
                    name: 'Lim Seow Chong',
                    major: 'Information Systems',
                    year: '2',
                    interests: [
                        'Data Science',
                        'Artificial Intelligence',
                        'Mathematics',
                        'Software Engineering'
                    ]
                },
                {
                    id: 'sktam.2020@smu.edu.sg',
                    name: 'Tam Siao Kia',
                    major: 'Computer Science',
                    year: '3',
                    interests: [
                        'Cyber Security',
                        'Software Engineering',
                        'Cloud Computing',
                        'Blockchain',
                        'Web 3.0'                        
                    ]
                },
                {
                    id: 'ctee.2022@smu.edu.sg',
                    name: 'Clement Tee',
                    major: 'Economics',
                    year: '1',
                    interests: [
                        'Econometrics',
                        'Business Intelligence',
                        'FinTech',
                        'Investment Banking'                        
                    ]
                },
                {
                    id: 'mteo.2019@smu.edu.sg',
                    name: 'Michelle Teo',
                    major: 'Business Management',
                    year: '4',
                    interests: [
                        'Entrepreneurship',
                        'Management',
                        'Marketing'
                    ]
                }
            ]
            
        }
    },

    computed: {
        displayUsers() {
            return this.users
        }
    }
}
</script>