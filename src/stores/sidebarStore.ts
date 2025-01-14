import { defineStore } from 'pinia';

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isVisible: true,
    isClosing: false,
    isMobile: false
  }),
  actions: {
    toggleSidebar() {
      if (this.isVisible) {
        this.isClosing = true;
        setTimeout(() => {
          this.isVisible = false;
          this.isClosing = false;
        }, 300);
      } else {
        this.isVisible = true;
      }
    },
    updateMobileState() {
      this.isMobile = window.innerWidth < 768;
      if (this.isMobile) {
        this.isVisible = false;
      }
    }
  }
});
