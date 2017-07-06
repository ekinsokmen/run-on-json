var filterById = function(i)
{
    return i.id >= 3;
};

var printOutItem = function(i)
{
    console.log(i.name);
}

input.items.filter(filterById).forEach(printOutItem);
