// Write your shallowEquality function here! ✨
// You'll need to export it so the tests can run it.
export const shallowEquality = (a: string[], b: string[])  => {
    let match = false;
    if (a.length !== b.length) {
        match = false;
    } else {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) { 
             match = false;
            }
            else {
                match = true;
            }
    }    
    }
    
    
    return match;
}
