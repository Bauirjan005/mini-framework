/**
 * Routing System
 */

export function createRouter(routes, onNavigate) {
    /**
     * Handles URL hash changes
     */
    const handleNavigation = () => {
        // Get path from hash, default to '/'
        const hash = window.location.hash.slice(1) || '/';
        
        // Find matching route or fallback to '/'
        const route = routes[hash] || routes['/'] || null;
        
        if (route) {
            onNavigate(route, hash);
        }
    };

    /**
     * Programmatically navigate to a path
     * @param {string} path 
     */
    const navigate = (path) => {
        window.location.hash = path;
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleNavigation);
    
    // Initial navigation on load
    window.addEventListener('load', handleNavigation);

    return {
        navigate,
        currentPath: () => window.location.hash.slice(1) || '/'
    };
}
