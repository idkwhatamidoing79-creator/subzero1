 function onSelect() {
      const sel = document.getElementById('ep-select');
      document.getElementById('launch-btn').disabled = sel.value === '';
    }

    function doLaunch() {
      const sel = document.getElementById('ep-select');
      if (sel.value) window.location.href = sel.value;
    }

    function closeIfOutside(e) {
      if (e.target === document.getElementById('overlay')) {
        document.getElementById('overlay').classList.remove('open');
      }
    }