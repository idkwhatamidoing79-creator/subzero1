  document.getElementById('searchBar').addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const items = document.querySelectorAll('.game-item');
            
            items.forEach(item => {
                const card = item.querySelector('.card');
                const altText = card.alt.toLowerCase();
                
                // Show/hide the entire item wrapper
                item.style.display = altText.includes(searchTerm) ? 'flex' : 'none';
            });
        });