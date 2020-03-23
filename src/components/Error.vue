<template>
  <div class="error">You've got Server Error</div>
</template>

<script>
export default {
  name: "Error"
};
</script>

<style>
.error {
  position: fixed;
  display: block;
  bottom: 2rem;
  font-size: 2rem;
  background: white;
  width: 30rem;
  left: 38%;
  z-index: 3;
  animation: fade-in 1.2s linear 1 0.1s forwards;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    /* transform: scale(0.7); */
  }
  100% {
    opacity: 1;
    /* transform: scale(1); */
  }
}
</style>
