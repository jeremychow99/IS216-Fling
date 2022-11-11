<template>
    <div>
        <p>Your Interests</p>
        <Multiselect mode="multiple" placeholder="Choose your interests" :options="options" />
    </div>
</template>
  
<script>
import Multiselect from '@vueform/multiselect'

export default {
    components: { Multiselect },
    data() {
        return {
            userInterests: [],
            options: [
                "Artificial Intelligence",
                "Blockchain",
                "Business Intelligence",
                "Cyber Security",
                "Data Science",
                "Econometrics",
                "Entrepreneurship",
                "Finance",
                "FinTech",
                "Investment Banking",
                "Law",
                "Machine Learning",
                "Management",
                "Marketing",
                "Mathematics",
                "Political Science",
                "Psychology",
                "Software Engineering",
                "Web 3.0"],
        }
    }
}
</script>
  
<style src="@vueform/multiselect/themes/default.css">

</style>