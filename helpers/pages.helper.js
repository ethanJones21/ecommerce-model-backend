const conditionPrevious = (startIndex, page, limit) => {
    if (startIndex > 0) {
        return {
            page: page - 1,
            limit,
        };
    } else {
        return null;
    }
};

const conditionNext = (endIndex, longitud, page, limit) => {
    if (endIndex < longitud) {
        return {
            page: page + 1,
            limit,
        };
    } else {
        return null;
    }
};

const fillPagesArr = (lengthArr) => {
    let arr = [];
    for (let i = 0; i < lengthArr; i++) {
        arr[i] = i + 1;
    }
    return arr;
};

module.exports = {
    conditionPrevious,
    conditionNext,
    fillPagesArr,
};
