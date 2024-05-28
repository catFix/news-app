<template>
    <div ref="observerElement" :class="{'fade-up': inView, 'initial-hidden': !inView}">
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        inView: false,
      };
    },
    mounted() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.inView = true;
              observer.unobserve(this.$refs.observerElement);
            }
          });
        },
        {
          threshold: 0.1,
        }
      );
      observer.observe(this.$refs.observerElement);
    },
  };
  </script>
  
  <style scoped>
  .initial-hidden {
    opacity: 0;
    transform: translateY(20px);
  }
  .fade-up {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.6s, transform 0.6s;
  }
  </style>
  