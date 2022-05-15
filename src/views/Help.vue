<template>
  <app-page :back="true" title="FAQ">
    <question-item
      v-for="(item, idx) of questions"
      :key="idx"
      :question="item"
    />
  </app-page>
</template>

<script>
import AppPage from "../components/ui/AppPage";
import QuestionItem from "../components/question/QuestionItem";

export default {
  components: { QuestionItem, AppPage },
  setup () {
    const questions = [
      {
        title: 'What is in this system?',
        text: 'There is everything to see what requests a person added'
      },
      {
        title: 'How works authorization here?',
        text: 'Everything is implemented via Firebase'
      }
    ]

    return { questions }
  }
}
</script>
