import { Category } from "../class/Category";
import { Resource } from "../class/Resource";
import { SpigetAPI } from "../class/SpigetAPI";

const api = new SpigetAPI("test");

jest.setTimeout(10000);

it("check if getAllCategories works", async () => {
    let categories = await api.getCategories();

    if (!categories) {
        expect(categories).not.toBeNull();
        return;
    }

    expect(categories).toBeInstanceOf(Array);
    expect(categories[0]).toBeInstanceOf(Category);
});

it("check if getCategoryByID works", async () => {
    let category = await api.getCategoryByID(2);

    if (!category) {
        expect(category).not.toBeNull();
        return;
    }

    expect(category).toBeInstanceOf(Category);
});

test("not be null", async () => {
    let category = await api.getCategoryByID(3);
    expect(category).not.toBeNull();
})

test("testing getResources", async () => {
    let category = await api.getCategoryByID(3);
    if(!category) return;

    let resources = await category.getResources();

    if (!resources) {
        expect(resources).not.toBeNull();
        return;
    }

    expect(resources).toBeInstanceOf(Array);
    expect(resources[0]).toBeInstanceOf(Resource);
})

test("check if invalid category return null", async () => {

    let category = await api.getCategoryByID(1);

    expect(category).toBeNull();
})