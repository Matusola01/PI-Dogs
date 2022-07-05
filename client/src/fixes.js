// arreglo de filtrado por orden
export function sortAsc (a, b, prop){
    let A;
    let B;
    if(prop === 'name'){
        A = a[prop].toLowerCase();
        B = b[prop].toLowerCase();
    }else if (prop === 'weight'){
        let As = a[prop].split(' - ');
        let Bs = b[prop].split(' - ');
        A = As[1] ? Number(As[1]) : Number(As[0]);
        B = Bs[1] ? Number(Bs[1]) : Number(Bs[0]);
        if( A === B ){
            A = Number(As[0]);
            B = Number(Bs[0]);
        }
    }
    if (A < B || !B) return -1
    if (A > B || !A) return 1;
    return 0;
}
    
    export function sortDesc (a, b, prop){
    let A;
    let B;
    if(prop === 'name'){
        A = a[prop].toLowerCase();
        B = b[prop].toLowerCase();
    }else if (prop === 'weight'){
        let As = a[prop].split(' - ');
        let Bs = b[prop].split(' - ');
        A = As[1] ? Number(As[1]) : Number(As[0]);
        B = Bs[1] ? Number(Bs[1]) : Number(Bs[0]);
        if( A === B ){
            A = Number(As[0]);
            B = Number(Bs[0]);
        }
    }
    if (B < A || !B) return -1;
    if (B > A || !A) return 1;
    return 0;
} 