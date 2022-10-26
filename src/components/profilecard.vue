<template>
    <div class="col-xl-3 col-sm-6 mb-4 text-center">
        <div class="bg-light rounded shadow-sm py-3 px-4"><img src="https://bootstrapious.com/i/snippets/sn-team/teacher-4.jpg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
            <h5 class="mb-2">{{ name }}</h5><span class="small text-uppercase text-muted">{{ major }} Major (Y{{ year }})</span>

            <hr>

            <h6 class="mt-2">Interest</h6>
            <div style="height:80px">
                <span v-for="(interest, index) in interests" :key="index" class="badge rounded-pill bg-dark mx-1">{{ interest }}</span>
            </div>


            <hr>

            <div class="row">
                <div class="col-6">
                    <button type="button" class="btn btn-primary w-100" @click="view_profile">View Profile</button>
                </div>
                <div class="col-6">
                    <button type="button" class="btn btn-success w-100" @click="message">Message</button>
                </div>
            </div>
            
        </div>
    </div>
    <!-- <div class="col-xl-6 col-sm-12 mb-5">
        <div class="bg-light rounded shadow-sm py-5 px-4">
            <div class="row">
                <div class="col-3">
                    <img src="https://bootstrapious.com/i/snippets/sn-team/teacher-4.jpg" alt="" width="100" class="img-fluid mb-3 shadow-sm">
                </div>
                <div class="col-9">
                    <h5>Michelle Teo</h5>

                    <hr>

                    <h6 class="small text-muted">Infomation Systems Major (Y3)</h6>

                    <hr>

                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto accusantium ipsa reiciendis, laudantium nesciunt exercitationem eos distinctio earum, neque dolorem perspiciatis dolore facilis natus! Asperiores consequuntur totam aperiam. Dolores, ipsa?</p>

                    <hr>

                    <div>
                        <span class="badge rounded-pill bg-dark mx-1">Machine Learning</span>
                        <span class="badge rounded-pill bg-dark mx-1">Cybersecurity</span>
                        <span class="badge rounded-pill bg-dark mx-1">FinTech</span>
                        <span class="badge rounded-pill bg-dark mx-1">Investment Banking</span>
                        <span class="badge rounded-pill bg-dark mx-1">Marketing</span>
                    </div>

                </div>
            </div>
        </div>
    </div> -->
    
</template>

<script>
export default {
    props: ['name', 'major', 'year', 'interests'],
    methods: {
        view_profile() {

        },
        message() {

        }
    }
}
</script>