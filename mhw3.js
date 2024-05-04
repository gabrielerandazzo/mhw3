const shown_image_btn_list = document.querySelectorAll('.shown-image-btn');
const banner_image = document.querySelector('.banner-image');
const more_brands_btn = document.querySelector('.more-text');
const parts_brand_container = document.querySelector('.parts-brand-container');
const footer_links_list = document.querySelectorAll('.footer-links');
const car_brands_container = document.querySelector('.brand-grid-container');

function reset_selected_imagr_btn() {
    for (const btn of shown_image_btn_list) {
        btn.classList.remove('selected');
    }
}

function set_shown_image_btn_by_id(id) {
    let full_id = '#shown-image-btn-' + id;
    let btn = document.querySelector(full_id);
    reset_selected_imagr_btn();
    btn.classList.add('selected');
}

let shown_image = 1;

function set_banner_image_by_id(id) {
    switch (id) {
        case '1':
            banner_image.src = "assets/banner1.jpeg"
            shown_image = 1;
            break;
        case '2':
            banner_image.src = "assets/banner2.jpeg"
            shown_image = 2;
            break;

        case '3':
            banner_image.src = "assets/banner3.jpeg"
            shown_image = 3;
            break;

        case '4':
            banner_image.src = "assets/banner4.jpeg"
            shown_image = 4;
            break;
    }
}

function update_banner_image(event) {
    let btn = event.currentTarget;

    if (btn.classList.contains('selected')) {
        console.log("already selected");
    } else {
        reset_selected_imagr_btn();
        btn.classList.add('selected');
        set_banner_image_by_id(btn.id.charAt(16))
    }
}

for (let btn of shown_image_btn_list) {
    btn.addEventListener("click", update_banner_image);
}

function periodically_update_image() {
    if (shown_image > 3) {
        shown_image = 0;
    }
    shown_image++;
    set_banner_image_by_id(shown_image.toString());
    set_shown_image_btn_by_id(shown_image.toString());
}

setInterval(periodically_update_image, 4000);

let parts_brand_expanded = false;

function expand_brands_section() {
    const all_brands = document.querySelectorAll('.parts-brand-item');
    if (!parts_brand_expanded) {
        parts_brand_expanded = true;
        parts_brand_container.style.flexWrap = "wrap"
        for (const item of all_brands) {
            item.style.display = "flex";
        }
        more_brands_btn.textContent = "Chiudi";
        let up_arrow = document.createElement('span');
        up_arrow.classList.add('more-btn');
        up_arrow.classList.add('close');
        more_brands_btn.appendChild(up_arrow);
    } else {
        parts_brand_expanded = false;
        more_brands_btn.textContent = "Di più";
        let up_arrow = document.createElement('span');
        up_arrow.classList.add('more-btn');
        more_brands_btn.appendChild(up_arrow);
        parts_brand_container.style.flexWrap = "noWrap"
        if (window.innerWidth < 767) {
            for (const item of all_brands) {
                if (item.dataset.index > 2) {
                    item.style.display = "none";
                }
            }
        } else if (window.innerWidth < 990) {
            for (const item of all_brands) {
                if (item.dataset.index > 6) {
                    item.style.display = "none";
                }
            }
        }
    }
}

more_brands_btn.addEventListener("click", expand_brands_section);

function onWindowSizeChanged() {
    let width = window.innerWidth;
    const all_brands = document.querySelectorAll('.parts-brand-item');
    if (!parts_brand_expanded) {
        if (width > 760 && width < 990) {
            for (const item of all_brands) {
                if (item.dataset.index <= 6) {
                    item.style.display = "flex";
                }
            }
        } else if (width > 990) {
            for (const item of all_brands) {
                item.style.display = "flex";
            }
        } else {
            for (const item of all_brands) {
                if (item.dataset.index > 2) {
                    item.style.display = "none";
                }
            }
        }
    }
}
window.addEventListener("resize", onWindowSizeChanged);

let footer_links_expanded = false;

function expand_footer_links(event) {
    const all_links_item = document.querySelectorAll('.footer-links-item');
    let index = event.currentTarget.dataset.index;
    if (!footer_links_expanded) {
        event.currentTarget.style.height = 'auto'
        for (const item of all_links_item) {
            if (item.dataset.index === index) {
                item.style.display = "flex"
            }
        }
        footer_links_expanded = true;
    } else {
        event.currentTarget.style.height = '48px'
        for (const item of all_links_item) {
            if (item.dataset.index === index) {
                item.style.display = "none"
            }
        }
        footer_links_expanded = false;
    }

}

for (const item of footer_links_list) {
    item.addEventListener('click', expand_footer_links);
}

const car_brands_array = [
    "assets/fiat.svg",
    "assets/vw.svg",
    "assets/bmw.svg",
    "assets/mercedes.svg",
    "assets/audi.svg",
    "assets/ford.svg",
    "assets/opel.svg",
    "assets/alfa.svg",
    "assets/peugeot.svg",
    "assets/citroen.svg",
    "assets/toyota.svg",
    "assets/nissan.svg",
    "assets/lancia.svg",
    "assets/mini.svg",
    "assets/hyundai.svg",
    "assets/fiat.svg"
];

for (const image of car_brands_array) {
    let image_container = document.createElement('div');
    let brand_image = document.createElement('img');

    image_container.classList.add('brand-grid-item');
    brand_image.classList.add('brand-grid-item-image');

    brand_image.src = image;

    image_container.appendChild(brand_image);

    car_brands_container.appendChild(image_container);
}

const registration_modal = document.querySelector('.registration-modal-container');

const login_modal = document.querySelector('.login-modal-container');

function showRegistrationModal(event) {
    registration_modal.classList.remove('show-none');

    if (!login_modal.classList.contains('show-none')) {
        login_modal.classList.add('show-none');
    }
}

function showLoginModal(event) {
    login_modal.classList.remove('show-none');
}

const header_login_btn = document.querySelector('#header-login');

header_login_btn.addEventListener('click', showLoginModal);

function closeRegistrationModal(event) {
    if (!registration_modal.classList.contains('show-none')) {
        registration_modal.classList.add('show-none');
    }
}

function closeloginModal(event) {
    if (!login_modal.classList.contains('show-none')) {
        login_modal.classList.add('show-none');
    }
}

const create_account_btn = document.querySelector('.create-account-btn');

create_account_btn.addEventListener('click', showRegistrationModal);

const close_login_modal_btn = document.querySelector('.close-login-modal-btn');

close_login_modal_btn.addEventListener('click', closeloginModal);

const close_registration_modal_btn = document.querySelector('.close-registration-modal-btn');

close_registration_modal_btn.addEventListener('click', closeRegistrationModal);

let user = {
    id: '',
    fullName: '',
    email: '',
    gender: ''
};

function onLoginJson(u) {
    console.log(u)
    if (Object.keys(u).length > 0) {
        console.log("name = " + u[0].name);
        user.id = u[0].id;
        user.name = u[0].name;
        user.gender = u[0].gender;
        document.querySelector('#my-autodoc-label').textContent = "ciao, " + user.name;
        document.querySelector('#my-autodoc-label').style.marginTop = "5px";
        document.querySelector('#header-login-text').classList.add('show-none');
        closeRegistrationModal();
        closeloginModal();
    } else {
        document.querySelector('#login-message-label').textContent = "Email o password errati!";
    }

}

function onLoginResponse(response) {
    if (response.status === 200) {
        return response.json();
    } else {
        document.querySelector('#login-message-label').textContent = "errore!";
    }
}

const goRestUrl = 'https://gorest.co.in/public/v2/users';
const accessToken = 'bd2151aa1af84852f021cc0e499214fff4129fc1771d6c634a3aed4885112ffe';

function fakeLogin(email, password) {
    user.email = email;
    fetch(goRestUrl + '?email=' + email, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }).then(onLoginResponse).then(onLoginJson);
}

function onRegistrationResponse(response) {
    if (response.status == 201) {
        console.log("done!!");
        user.email = regEmail.value;
        fakeLogin(regEmail.value, regPassword.value);
        closeRegistrationModal();
    } else if (response.status === 422) {
        emailLabel.textContent = "Email già in uso!";
    }
}

const emailLabel = document.querySelector('#emailLabel');

function onEmailResponse(response) {
    if (response.status == 200) {
        return response.json();
    } else if (response.status == 400) {
        emailLabel.textContent = "Email non valida!";
    } else {
        console.log("Email verification error!");
    }
}

const regName = document.querySelector('#registration-name');
const regSurname = document.querySelector('#registration-surname');
const gender = document.querySelector('#gender-select');
const regEmail = document.querySelector('#registration-email');
const regPassword = document.querySelector('#registration-password');

function onEmailJson(json) {
    console.log(json);

    if (json.did_you_mean === null && json.disposable === false) {
        const userData = {
            name: regName.value + " " + regSurname.value,
            gender: gender.value,
            email: regEmail.value,
            status: 'active'
        };

        fetch(goRestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
            , body: JSON.stringify(userData)
        }).then(onRegistrationResponse);
    } else {
        if (json.disposable) {
            emailLabel.textContent = "Non puoi usare un email temporanea!";
        }

        if (json.did_you_mean !== null) {
            emailLabel.textContent = "Intendevi: " + json.did_you_mean + "?";
        }
    }
}

function register(event) {
    event.preventDefault();
    const emailCheck_url = "https://api.mailcheck.ai/email/";

    console.log(emailCheck_url + regEmail.value);
    if (regName.value !== "" && regSurname.value !== "" && regEmail.value !== "" && gender.value !== "" && regPassword.value !== "") {
        if (regEmail.value.includes('.') && regEmail.value.includes('@')) {
            fetch(emailCheck_url + regEmail.value).then(onEmailResponse).then(onEmailJson)
        }
    }
}

const registration_form = document.querySelector('#register-form');

registration_form.addEventListener('submit', register);

const logEmail = document.querySelector('#login-email');
const logPassword = document.querySelector('#login-password');

function login(event) {
    event.preventDefault();
    if (logEmail.value !== '' && logPassword.value !== '') {
        fakeLogin(logEmail.value, logPassword.value);
    }

}

const login_form = document.querySelector('#login-form');

login_form.addEventListener('submit', login);