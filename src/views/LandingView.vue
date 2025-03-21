<script setup lang="ts">
import '../styles/landing/style.scss';
</script>

<template>
  <div class="page">
    <div class="page__body">
      <header class="header">
        <div class="container">
          <div class="header__content">
            <div class="top-bar">
              <a href="#top" class="top-bar__logo-link">
                <img
                  v-once
                  src="/assets/landing/images/logo.png"
                  alt="MYBIKE logo"
                  class="top-bar__logo"
                />
              </a>
              <div class="top-bar__icons">
                <a href="tel:+12345555555" class="icon icon--phone"></a>
                <a href="#menu" class="icon icon--menu"></a>
              </div>
            </div>
            <div class="header__bottom">
              <h1 class="header__title">Take the Streets</h1>
            </div>
          </div>
        </div>
      </header>

      <aside id="menu" class="page__menu menu">
        <div class="container">
          <div class="top-bar menu__top">
            <a href="#top" class="top-bar__logo-link">
              <img
                src="/assets/landing/images/logo-menu.png"
                alt="MYBIKE logo"
                class="top-bar__logo"
              />
            </a>
            <a href="#top" class="icon icon--close"></a>
          </div>
          <div class="menu__bottom">
            <nav class="nav menu__nav">
              <ul class="nav__list">
                <li class="nav__item">
                  <a class="nav__link" href="#top"> Home </a>
                </li>
                <li class="nav__item">
                  <a class="nav__link" href="#about-us"> About us </a>
                </li>
                <li class="nav__item">
                  <a class="nav__link" href="#compare-bikes"> Compare bikes </a>
                </li>
                <li class="nav__item">
                  <a class="nav__link" href="#details"> Details </a>
                </li>
                <li class="nav__item">
                  <a class="nav__link" href="#contacts"> Contacts </a>
                </li>
              </ul>
            </nav>
            <a href="tel:+1 234 5555-55-55" class="menu__phone-number"> +1 234 5555-55-55 </a>
            <a href="tel:+1 234 5555-55-55" class="menu__book-a-test-ride"> Book a test ride </a>
          </div>
        </div>
      </aside>

      <main class="main">
        <div class="container">
          <div class="main__content">
            <section id="about-us" class="about-us">
              <h2 class="section-title section-title--align-left about-us__title">Move Free</h2>
              <div class="about-us__content">
                <p class="about-us__description">
                  Shift your ride, not gears. Find the fastest way to move in the city as the bike
                  adapts intuitively to power the speed you need.
                </p>
              </div>
            </section>
            <section id="compare-bikes" class="compare-bikes">
              <h2 class="section-title">Compare Bikes</h2>
              <div class="compare-bikes__products">
                <article class="product compare-bikes__product">
                  <img
                    src="/assets/landing/images/products/sporty-4.png"
                    alt="Sporty 4"
                    class="product__photo"
                  />
                  <h3 class="product__title">Sporty 4</h3>
                  <p class="product__description">
                    The iconic frame brought to a new performance height as a sporty, active ride.
                  </p>
                  <p class="product__price">$ 2 590</p>
                </article>
                <article class="product compare-bikes__product">
                  <img
                    src="/assets/landing/images/products/ride-in-town-st.png"
                    alt="Ride in town ST"
                    class="product__photo"
                  />
                  <h3 class="product__title">Ride in town ST</h3>
                  <p class="product__description">
                    An open frame for an upright riding position as the most comfortable ride in
                    town.
                  </p>
                  <p class="product__price">$ 2 590</p>
                </article>
                <article class="product compare-bikes__product">
                  <img
                    src="/assets/landing/images/products/agile-ride-3.png"
                    alt="Agile ride 3"
                    class="product__photo"
                  />
                  <h3 class="product__title">Agile ride 3</h3>
                  <p class="product__description">
                    The lightweight frame that has earned its street tread as a sleek, agile ride.
                  </p>
                  <p class="product__price">$ 2 090</p>
                </article>
              </div>
            </section>
            <section id="details" class="details">
              <h2 class="section-title">The Details</h2>

              <div class="details__wrapper">
                <article class="detail">
                  <div class="detail__photos">
                    <a href="#" class="detail__link detail__link--wide">
                      <img
                        src="/assets/landing/images/details/auto-unlock-wide.png"
                        alt="Auto Unlock"
                        class="detail__photo"
                      />
                    </a>

                    <a href="#" class="detail__link detail__link--square">
                      <img
                        src="/assets/landing/images/details/auto-unlock-square.png"
                        alt="Auto Unlock"
                        class="detail__photo"
                      />
                    </a>
                  </div>
                  <h3 class="detail__title">Auto Unlock</h3>
                  <p class="detail__description">
                    The app senses when you're nearby to unlock automatically. GPS tracking so you
                    know where your bike is and can track it anytime.
                  </p>
                </article>

                <article class="detail">
                  <div class="detail__photos">
                    <a href="#" class="detail__link detail__link--wide">
                      <img
                        src="/assets/landing/images/details/range-&-ntegrated-lights-wide.png"
                        alt="Range & Integrated lights"
                        class="detail__photo"
                      />
                    </a>

                    <a href="#" class="detail__link detail__link--square">
                      <img
                        src="/assets/landing/images/details/range-&-ntegrated-lights-square.png"
                        alt="Range & Integrated lights"
                        class="detail__photo"
                      />
                    </a>
                  </div>
                  <h3 class="detail__title">Range & Integrated lights</h3>
                  <p class="detail__description">
                    The removable battery has up to 70km battery autonomy and weighs only 2.4 kg.
                    Lights integrated into the frame give you always-on visibility day and night.
                  </p>
                </article>

                <article class="detail">
                  <div class="detail__photos">
                    <a href="#" class="detail__link detail__link--square">
                      <img
                        src="/assets/landing/images/details/hydraulic-disc-brakes-&-ightweight-square.png"
                        alt="Hydraulic disc brakes & Lightweight"
                        class="detail__photo"
                      />
                    </a>

                    <a href="#" class="detail__link detail__link--wide">
                      <img
                        src="/assets/landing/images/details/hydraulic-disc-brakes-&-ightweight-wide.png"
                        alt="Hydraulic disc brakes & Lightweight"
                        class="detail__photo"
                      />
                    </a>
                  </div>
                  <h3 class="detail__title">Hydraulic disc brakes & Lightweight</h3>
                  <p class="detail__description">
                    Brakes with total stopping power the second you make contact. The removable
                    battery has up to 70km battery autonomy and weighs only 2.4 kg. Lights
                    integrated into the frame give you always-on visibility day and night.
                  </p>
                </article>

                <div class="details__button">
                  <a href="/catalog" class="button details__button-link"> Explore </a>
                </div>
              </div>
            </section>

            <section id="contacts" class="contacts">
              <h2 class="section-title section-title--contact-us">Contact Us</h2>

              <div class="contacts__wrapper">
                <div class="contacts__form">
                  <form class="contacts__form-element" @submit.prevent>
                    <input
                      type="text"
                      placeholder="Name"
                      class="contacts__input contacts__input--name"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      class="contacts__input contacts__input--email"
                      required
                    />
                    <textarea
                      name="Message"
                      placeholder="Message"
                      class="contacts__input contacts__input--message"
                      required
                    ></textarea>
                    <button
                      class="button contacts__button"
                      type="submit"
                      aria-label="Send contacts"
                    >
                      Send
                    </button>
                  </form>
                </div>

                <div class="contacts__details">
                  <article class="contacts__contact">
                    <div class="contacts__contact-item contacts__contact-item--phone">
                      <p class="contacts__contact-title">Phone</p>
                      <a id="phone" href="tel:+123455555555" class="contacts__contact-link">
                        +1 234 5555-55-55
                      </a>
                    </div>
                    <div class="contacts__contact-item contacts__contact-item--email">
                      <p class="contacts__contact-title">Email</p>
                      <a href="mailto:stanislav.chyrva@gmail.com" class="contacts__contact-link">
                        stanislav.chyrva@gmail.com
                      </a>
                    </div>
                    <div class="contacts__contact-item contacts__contact-item--address">
                      <p class="contacts__contact-title">Adrress</p>
                      <a
                        href="https://maps.app.goo.gl/yhdT9nAqqXWYxCk58"
                        target="_blank"
                        class="contacts__contact-link"
                      >
                        400 first ave. suite 700 Minneapolis, MN 55401
                      </a>
                    </div>
                  </article>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer class="footer">
        <div class="footer__wrapper">
          <img src="/assets/landing/images/footer.png" alt="page footer" class="footer__image" />
        </div>
      </footer>
    </div>
  </div>
</template>
