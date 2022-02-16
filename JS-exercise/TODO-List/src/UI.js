import Person from "./Person";
import Storage from "./Storage";

const container = document.getElementById("container");
const hikerContainer = document.getElementById("hikersContainer");

const storage = new Storage;

export default class UI {

    init() {
        this.createHikerButton();
        this.loadHikers();
        storage.consoleLogLocalStorage();
    }

    /**single button that when clicked opens an input field and a submit button. add an element on screen below */
    createHikerButton() {
        const addHikerContainer = document.createElement("div");
        addHikerContainer.style.display = "none";

        let addButton = document.createElement("button")
        addButton.textContent = "Add a new Hiker";
        addButton.setAttribute("title", "click to add a new hiker");

        let okButton = document.createElement("button")
        okButton.textContent = "OK";
        okButton.setAttribute("title", "confirm name")

        let inputField = document.createElement("INPUT");
        inputField.setAttribute("type", "text");

        addHikerContainer.appendChild(inputField)
        addHikerContainer.appendChild(okButton)

        container.appendChild(addButton)
        container.appendChild(addHikerContainer)


        addButton.addEventListener("click", () => {
            addHikerContainer.style.display = "flex"
        });
        okButton.addEventListener("click", () => {
            this.createElementOnScreen(inputField.value, "hiker");
            storage.save(inputField.value, new Person(inputField.value));
            addHikerContainer.style.display = "none";
            inputField.value = "";
        })

        document.addEventListener("click", (e) => {
            if (e.target.id == "addWardrobe") {
                e.target.parentElement.appendChild(this.createSelection(e.target.parentElement.id));
            }
        });
    }

    /**creates the basic block for each user */
    createElementOnScreen(name, type) {

        const div = document.createElement("div");
        // const addElement = document.createElement("div");

        if (type == "hiker") {
            div.setAttribute("id", name);
            div.setAttribute("class", "hiker");

            div.textContent = name;

            div.appendChild(this.addRemoveButton(name));
            div.appendChild(this.addModifyButton(name));
            div.appendChild(this.addWardrobeButton())
                // div.appendChild(addElement);
            hikerContainer.appendChild(div);
        }

        if (type[0] == "item") {
            const text1 = document.createElement("label")
            const text2 = document.createElement("label")
            const breaker = document.createElement("label")

            div.setAttribute("id", "item");
            text1.setAttribute("id", "text1")
            text2.setAttribute("id", "text2")
            breaker.setAttribute("id", "breaker")

            text1.textContent = name[0];
            breaker.textContent = " // "
            text2.textContent = name[1];

            div.appendChild(text1);
            div.appendChild(breaker)
            div.appendChild(text2);
            div.appendChild(this.addRemoveButton(type[1]));
            div.appendChild(this.addModifyButton(type[1]));
        }
        return div;
    }

    addWardrobeButton() {
        const addElement = document.createElement("div");
        addElement.setAttribute("id", "addWardrobe");
        addElement.setAttribute("title", "add an element to the hiker");
        addElement.textContent = "A";
        addElement.style.float = "right";
        addElement.style.display = "inline-block";

        return addElement;
    }

    addRemoveButton(name) {
        const remove = document.createElement("div");
        remove.textContent = "X";
        remove.style.color = "red"
        remove.setAttribute("id", "remove");
        remove.setAttribute("class", name)
        remove.setAttribute("title", "remove the element");
        remove.style.float = "right";
        remove.style.display = "inline-block";

        remove.addEventListener("click", (e) => {
            if (e.target.id == "remove" && e.target.parentElement.id == "item") {
                storage.remove("b", e.target.parentElement.class)
            }
            if (e.target.id == "remove") {
                const toRemove = document.getElementsByClassName(name)
                e.target.parentElement.style.display = "none"
                storage.remove("a", toRemove[0].className)
            }
        });

        return remove;
    }

    addModifyButton(name) {
        const modify = document.createElement("div");
        modify.textContent = "M";
        modify.setAttribute("id", "modify");
        modify.setAttribute("class", name)
        modify.setAttribute("title", "modify the tab");
        modify.style.float = "right";
        modify.style.display = "inline-block";

        modify.addEventListener("click", (e) => {
            if (e.target.id == "modify") {
                this.modifyEventListener(e);
            }
        })

        return modify;
    }

    modifyEventListener(e) {
        const elementsToModify = [];
        const hikerName = e.target.className;
        const type = e.target.parentNode.parentNode.className;
        const nodes = e.target.parentNode.childNodes;
        nodes.forEach(node => {
            if (node.localName == "label" && node.id != "breaker") {
                elementsToModify.push(node);
            }
        })
        const nodesTest = e.target.parentNode.parentNode.childNodes;
        if (elementsToModify.length == 0) {
            document.getElementById(hikerName).appendChild(this.modifyHikerLayout(elementsToModify, hikerName, type))

        } else {

            nodesTest[nodesTest.length - 1].appendChild(this.modifyHikerLayout(elementsToModify, hikerName, type));
        }


    }

    modifyHikerLayout(elements, hikerName, type) {
        const modifyHikerContainer = document.createElement("div");

        let inputField1 = document.createElement("INPUT");
        inputField1.setAttribute("type", "text");
        inputField1.setAttribute("id", "inputField1")

        let inputField2 = document.createElement("INPUT");
        inputField2.setAttribute("type", "text");
        inputField2.setAttribute("id", "inputField2")

        let okButton = document.createElement("button")
        okButton.textContent = "OK";
        okButton.setAttribute("title", "confirm change")


        if (elements.length == 0) {
            inputField1.value = hikerName;
            modifyHikerContainer.appendChild(inputField1);
            modifyHikerContainer.appendChild(okButton);
            modifyHikerContainer.appendChild(this.addRemoveButton());

            okButton.addEventListener("click", () => {
                console.log(hikerName)
                storage.modify(hikerName, undefined, undefined, inputField1.value);
            });

        } else {
            inputField1.value = elements[0].textContent
            inputField2.value = elements[1].textContent
            modifyHikerContainer.appendChild(inputField1);
            modifyHikerContainer.appendChild(inputField2);
            modifyHikerContainer.appendChild(okButton);
            modifyHikerContainer.appendChild(this.addRemoveButton());

            okButton.addEventListener("click", () => {
                let input1 = document.getElementById("inputField1").value
                let input2 = document.getElementById("inputField2").value
                storage.modify(hikerName, type, elements, [
                    [input1],
                    [input2]
                ])
            })
        }
        return modifyHikerContainer;
    }

    /**gets the users from the localStorage and load them on screen// gets an array of elements from storage, for each element create a single element with the name, then append a new div on it with all the details*/
    loadHikers() {
        const stored = storage.load();
        stored.forEach(hiker => {
            const addDiv = this.createElementOnScreen(hiker.name, "hiker"); //create and append the element with the name
            for (let i = 0; i < hiker.wardrobe.length; i++) {
                let wardrobeDiv = document.createElement("div");
                const hikerclass = hiker.name + "_" + hiker.wardrobe[i].name;
                if (document.getElementById(hikerclass) == null) {
                    wardrobeDiv.setAttribute("id", hikerclass)
                    wardrobeDiv.setAttribute("class", hiker.wardrobe[i].name)
                    wardrobeDiv.textContent = hiker.wardrobe[i].name;
                    wardrobeDiv.style.border = "1px solid orange";

                } else {
                    wardrobeDiv = document.getElementById(hikerclass);
                }
                let itemDiv = this.createElementOnScreen([
                    [hiker.wardrobe[i].set[0].name],
                    [hiker.wardrobe[i].set[0].note]
                ], [
                    ["item"],
                    [hiker.name]
                ])
                wardrobeDiv.appendChild(itemDiv); //append item in the collector div
                addDiv.appendChild(wardrobeDiv);
            }
        });
    }

    /**create a select element */
    createSelection(parentId) {
        const element = document.createElement("div");
        element.setAttribute("id", "element");

        const wardrobe = document.createElement("select");
        wardrobe.setAttribute("id", "select");
        const optionH = document.createElement("option");
        const optionB = document.createElement("option");
        const optionBottom = document.createElement("option");
        const optionShoes = document.createElement("option");
        const optionExtra = document.createElement("option");

        optionH.textContent = "Head";
        optionB.textContent = "Body";
        optionBottom.textContent = "Bottom";
        optionShoes.textContent = "Shoes";
        optionExtra.textContent = "Extra";

        wardrobe.appendChild(optionH);
        wardrobe.appendChild(optionB);
        wardrobe.appendChild(optionBottom);
        wardrobe.appendChild(optionShoes);
        wardrobe.appendChild(optionExtra);

        let inputName = document.createElement("INPUT");
        inputName.setAttribute("type", "text");
        inputName.setAttribute("id", "inputName");

        let inputNote = document.createElement("INPUT");
        inputNote.setAttribute("type", "text");
        inputNote.setAttribute("id", "inputNote");

        let okButton = document.createElement("button")
        okButton.textContent = "Confirm";
        okButton.setAttribute("id", "confirm");
        okButton.setAttribute("title", "confirm selection")

        document.addEventListener("click", (e) => {
            if (e.target.id == "confirm" && inputNote.value != "" && inputName.value != 0) {

                const name = parentId;
                const selectValue = wardrobe.value;
                const inputNameValue = inputName.value;
                const inputNoteValue = inputNote.value;

                const newDiv = document.createElement("div")
                newDiv.textContent = selectValue + ": " + inputNameValue + " // " + inputNoteValue;
                storage.saveB(name, [selectValue, inputNameValue, inputNoteValue]);
                newDiv.appendChild(this.addRemoveButton());
                document.getElementById(parentId).appendChild(newDiv)
                element.remove();

                inputName.value = inputNote.value = "";
            }
        })

        element.appendChild(wardrobe);
        element.appendChild(inputName);
        element.appendChild(inputNote);
        element.appendChild(okButton);
        element.appendChild(this.addRemoveButton());

        return element;
    }


}