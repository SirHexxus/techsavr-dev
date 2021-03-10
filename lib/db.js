import firebase from './firebase';
import getStripe from './stripe';

const firestore = firebase.firestore();
const app = firebase.app();

export const createUser = (uid, data) => {
  // console.log({ uid, data });
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
};

export const createSite = (data) => {
  const site = firestore.collection('sites').doc();
  site.set(data);
  return site;
};

export const createFeedback = (data) => {
  return firestore.collection('feedback').add(data);
};

export const deleteFeedback = (id) => {
  return firestore.collection('feedback').doc(id).delete();
};

export const createCheckoutSession = async (uid) => {
  const checkoutSessionRef = await firestore
    .collection('users')
    .doc(uid)
    .collection('checkout_sessions')
    .add({
      price: 'price_1IOHWTJ5qFzU80EcFMXZx9ff',
      allow_promotion_codes: true,
      success_url: window.location.origin,
      cancel_url: window.location.origin
    });

  checkoutSessionRef.onSnapshot(async (snap) => {
    const { sessionId } = snap.data();

    if (sessionId) {
      const stripe = await getStripe();

      stripe.redirectToCheckout({ sessionId });
    }
  });
};

export async function goToBillingPortal() {
  const functionRef = app
    .functions('us-west2')
    .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');

  const { data } = await functionRef({
    returnUrl: `${window.location.origin}/account`
  });

  window.location.assign(data.url);
}
