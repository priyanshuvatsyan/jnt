import { useState } from 'react'
import React  from 'react'
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  
  provider,
  signInWithPopup,
  db,
} from './firebase'
import {doc, setDoc} from 'firebase/firestore'
import './styles/Login.css'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const admin = 'jnsharma087@gmail.com';
  const navigate = useNavigate();

  const handleGoogleSignIn = async ()=>{
    
    try {
      const result = await signInWithPopup(auth,provider);
      const user = result.user;

      // Add a new document in collection "users"
      await setDoc(doc(db,'users',user.uid),{
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        
      });
      if (user.email === admin) {
       /*  alert(`Welcome Admin ${user.displayName}`); */
        navigate('/allProducts');
      }
      else{
       /*  alert(`Welcome ${user.displayName}`); */
        navigate('/');
      }
      
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

  const handleAuth = async (e)=>{
    e.preventDefault();
    try {
        if(isSignUp){
        const result = await createUserWithEmailAndPassword(auth,email,password);
        const user =  result.user;

        // get full name from the form
        const fullName = e.target.elements.fullName.value;

        // Add a new document in collection "users"
        await setDoc(doc(db,'users',user.uid),{
          name: fullName,
          email: user.email,
          uid: user.uid,
          
        });
        /* alert('Account created successfully!'); */
        navigate('/');
      }
      else{
        const result =  await signInWithEmailAndPassword(auth,email,password);
        const user  = result.user;

        if (user.email === admin) {
          alert('Welcome Admin!');
          navigate('/allProducts'); // Redirect to admin dashboard
        } else {
         /*  alert('Logged in successfully!'); */
          navigate('/'); // Redirect to the regular website
        }

       
      }
    }
    catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

  return (
    <div>
        <div className="outer-container">
            <div className="text">
                <h1>Get Started With Us</h1>
                <p>Sign in to access your account</p>
               {/*  <p>Don't worry we never share your personal details with anyone</p> */}
               <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Switch to Sign In' : 'Switch to Create Account'}
          </button>
            </div>
            <div className="login">
            <img className='login-img' src="/loginimg.webp" alt="" />
              <div className="auth-form">
                <h2>
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </h2>
                <form onSubmit={handleAuth}>
                  {
                    isSignUp && (
                      <input type="text"
                      name='fullName'
                      placeholder='Full Name'
                      required
                      />
                    )
                  }
                  <input type="email" 
                  placeholder='Email'
                  value={email}
                  onChange={(e)=>setemail(e.target.value)}
                    />
                  <input type="password"
                  placeholder='Password'
                  value={password}
                  onChange={(e)=>setpassword(e.target.value)}
                  />

                  <button
                  type='submit'
                  className='login-button'

                  >
                    {isSignUp ? 'Sign Up' : 'Sign In'}

                  </button>
                
                <button onClick={handleGoogleSignIn} className='google-button'>
                  Sign In With Google
                </button>
                <p>Don't worry we never share your personal details with anyone</p>
                </form>
              </div>
            </div>
        </div>
    </div>
  )
}
