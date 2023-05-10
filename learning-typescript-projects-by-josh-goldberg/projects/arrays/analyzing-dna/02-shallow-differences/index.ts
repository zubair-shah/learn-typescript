// Write your shallowDifferences function here! ✨
// You'll need to export it so the tests can run it.
// Write your shallowEquality function here! ✨
// You'll need to export it so the tests can run it.
export const shallowDifferences = (a: string[], b: string[])  => {
  const  match: (string| undefined)[] = [];
    if (a.length !== b.length) {
        return undefined
    } else {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) { 
            match.push(undefined)
            }
            else {
              match.push(a[i]);
            }
    }    
    }
    
    
    return match;
}
