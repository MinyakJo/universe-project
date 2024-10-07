import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import CharacteristicPage from "components/page/CharacteristicPage"
import CoursePage from "components/page/CoursePage"
import PassesPage from "components/page/PassesPage"
import CreateAccountPage from "components/page/CreateAccountPage"
import CustomerCenterPage from "components/page/CustomerCenterPage"
import PassDetailPage from "components/page/PassDetailPage"
import EventDetailPage from "components/page/EventDetailPage"
import EventPage from "components/page/EventPage"
import FindPage from "components/page/FindPage"
import InquiryCreatePage from "components/page/InquiryCreatePage"
import InquiryPage from "components/page/InquiryPage"
import LoginPage from "components/page/LoginPage"
import MainPage from "components/page/MainPage"
import MyInquiriesDetailPage from "components/page/MyInquiriesDetail"
import MyInquiriesPage from "components/page/MyInquiriesPage"
import MyPage from "components/page/MyPage"
import PaymentPage from "components/page/PaymentPage"
import PaymentDonePage from "components/page/PaymentDonePage"
import PurchaseHistoryPage from "components/page/PurchaseHistoryPage"
import RecruitingsDetailPage from "components/page/RecruitingsDetailPage"
import RecruitingsPage from "components/page/RecruitingsPage"
import RepeatUPassPage from "components/page/RepeatUPassPage"
import ReportServicePage from "components/page/ReportServicePage"
import ReviewPage from "components/page/ReviewPage"
import SchoolarshipPage from "components/page/SchoolarshipPage"
import TeacherInfoPage from "components/page/TeacherInfoPage"
import TeacherNewsPage from "components/page/TeacherNewsPage"
import TeachersPage from "components/page/TeachersPage"
import TeachingMaterialsDetailPage from "components/page/TeachingMaterialsDetailPage"
import TeachingMaterialsPage from "components/page/TeachingMaterialsPage"
import ZeroPassPage from "components/page/ZeroPassPage"
import CreateAccountDonePage from "components/page/CreateAccountDonePage"
import { useCookies } from "react-cookie"

const Router = () => {

    const [ cookies ] = useCookies([ "token" ])

    return(
        <Routes>
            <Route path="/" element={ <MainPage/> } />
            <Route path="/u-pass" element={ <RepeatUPassPage/> } />
            <Route path="/zero-pass" element={ <ZeroPassPage/> } />
            <Route path="/passes" element={ <PassesPage/> } />
            <Route path="/passes/:id" element={ <PassDetailPage/> } />
            <Route path="/purchase-pass" element={ cookies.token ? <PaymentPage/> : <Navigate to="/login" replace={ true }/> } />
            <Route path="/purchase-pass-done" element={ cookies.token ? <PaymentDonePage/> : <Navigate to="/login" replace={ true }/> } />
            <Route path="/purchase-pass-failed" element={ cookies.token ? <PaymentDonePage failed/> : <Navigate to="/login" replace={ true }/> } />
            <Route path="/courses/:id" element={ <CoursePage/> } />
            <Route path="/best-reviews" element={ <ReviewPage/> } />
            <Route path="/schoolarship" element={ <SchoolarshipPage/> } />
            <Route path="/characteristic" element={ <CharacteristicPage/> } />
            <Route path="/teachers" element={ <TeachersPage/> } />
            <Route path="/teachers/:id" element={ <TeacherInfoPage/> } />
            <Route path="/teacher-news/:id" element={ <TeacherNewsPage/> } />
            <Route path="/events" element={ <EventPage/> } />
            <Route path="/events/:id" element={ <EventDetailPage/> } />
            <Route path="/teaching-materials" element={ <TeachingMaterialsPage/> } />
            <Route path="/teaching-materials/:id" element={ <TeachingMaterialsDetailPage/> } />
            <Route path="/customer-center" element={ <CustomerCenterPage/> } />
            <Route path="/inquiries/:id" element={ <InquiryPage/> } />
            <Route path="/create-inquiry" element={ cookies.token ? <InquiryCreatePage/> : <Navigate to="/login" replace={ true }/> } />
            <Route path="/faqs/:id" element={ <InquiryPage faqs/> } />
            <Route path="/me" element={ cookies.token ? <MyPage/> : <Navigate to="/login" replace={ true }/> } />
            <Route path="/purchase-histories" element={ cookies.token ? <PurchaseHistoryPage/> : <Navigate to="/login" replace={ true }/> } />
            <Route path="/my-inquiries" element={ cookies.token ? <MyInquiriesPage/> : <Navigate to="/login" replace={ true }/> } />
            <Route path="/my-inquiries/:id" element={ cookies.token ? <MyInquiriesDetailPage/> : <Navigate to="/login" replace={ true }/> } />
            <Route path="/recruitings" element={ <RecruitingsPage/> } />
            <Route path="/recruitings/:id" element={ <RecruitingsDetailPage/> } />
            <Route path="/report-service" element={ <ReportServicePage/> } />
            <Route path="/login" element={ <LoginPage/> } />
            <Route path="/find-id" element={ <FindPage id/> } />
            <Route path="/find-password" element={ <FindPage pw/> } />
            <Route path="/reset-password" element={ <FindPage pwCheck/> } />
            <Route path="/create-account" element={ !cookies.token ? <CreateAccountPage/> : <Navigate to="/login" replace={ true }/> } />
            <Route path="/done-creating-account" element={ !cookies.token ? <CreateAccountDonePage/> : <Navigate to="/login" replace={ true }/> } />
        </Routes>
    )
}

export default Router