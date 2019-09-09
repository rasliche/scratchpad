<template>
  <div class="m-3">
    <b-card-group deck>
      <GoalCard v-for="goal in goals" :key="goal.id" :goalObj="goal" />
    </b-card-group>
  </div>
</template>

<script>
import GoalCard from '../components/GoalCard'
import { mapState } from 'vuex';

export default {
  name: 'Goals',
  components:{
    GoalCard,
  },
  computed: {
    ...mapState('goals',{
      goals: state => state.goals
    })
  }
}
</script>

<style>

</style>