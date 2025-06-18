// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="All_Analysis.html"><strong aria-hidden="true">1.</strong> All Analysis</a></li><li class="chapter-item expanded "><a href="Vidar/empty.html"><strong aria-hidden="true">2.</strong> Vidar</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="Vidar/b30e7cf92bdb26c05c226e0d5c82ce839a90cbef61a7a5305bd3fae87905090f.html"><strong aria-hidden="true">2.1.</strong> Dropper</a></li><li class="chapter-item expanded "><a href="Vidar/9e126eb3b73eeae34c46a4b3dc9dc184a19708fd2b2433302c69e6c06b3929ed.html"><strong aria-hidden="true">2.2.</strong> Logger/Stealer</a></li></ol></li><li class="chapter-item expanded "><a href="Remcos/empty.html"><strong aria-hidden="true">3.</strong> Remcos</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="Remcos/52db756a72b71d461eb46a8f40e04c6e594c1f3c5da27901c2a47f890dd279f8.html"><strong aria-hidden="true">3.1.</strong> Rat</a></li></ol></li><li class="chapter-item expanded "><a href="SmokeLoader/empty.html"><strong aria-hidden="true">4.</strong> SmokeLoader</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="SmokeLoader/ff5fc5c5318fa051992c7c3408d203f306c13b5fcd9400f860f734ce47a3b676.html"><strong aria-hidden="true">4.1.</strong> Loader</a></li></ol></li><li class="chapter-item expanded "><a href="SnakeKeylogger/empty.html"><strong aria-hidden="true">5.</strong> SnakeKeylogger</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="SnakeKeylogger/fa462108bc863ef19bb7572e7c77ab4f4b5694ae292e06d007418863e4b45d7e.html"><strong aria-hidden="true">5.1.</strong> Logger</a></li></ol></li><li class="chapter-item expanded "><a href="AgendaRansomware/empty.html"><strong aria-hidden="true">6.</strong> AgendaRansomware</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="AgendaRansomware/e90bdaaf5f9ca900133b699f18e4062562148169b29cb4eb37a0577388c22527.html"><strong aria-hidden="true">6.1.</strong> Ransomware</a></li></ol></li><li class="chapter-item expanded "><a href="Malware_1/empty.html"><strong aria-hidden="true">7.</strong> Analyzed for fun</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="Malware_1/fa132c7ca003a5fd97d96c3b656212802cf70f1735283b05144bdcae03e24894.html"><strong aria-hidden="true">7.1.</strong> 1</a></li><li class="chapter-item expanded "><a href="Malware_2/48126e558daec7e93f455c1268e37cab6e4754e245568fc6d8beb54277addef7.html"><strong aria-hidden="true">7.2.</strong> 2</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
