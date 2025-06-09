document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;
            
            // Close all other accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== accordionItem) {
                    item.querySelector('.accordion-header').classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = null;
            }
        });
    });
    
    // Open first accordion by default
    if (accordionHeaders.length > 0) {
        accordionHeaders[0].classList.add('active');
        accordionHeaders[0].nextElementSibling.style.maxHeight = 
            accordionHeaders[0].nextElementSibling.scrollHeight + 'px';
    }
});