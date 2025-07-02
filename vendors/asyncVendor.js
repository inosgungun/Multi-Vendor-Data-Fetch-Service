module.exports = async function asyncVendor(requestId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                requestId,
                name: ' Gungun Soni ',
                email: ' gungun@gmail.com '
            });
        }, 1000); 
    });
};
