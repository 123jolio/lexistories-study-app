import base64
from pathlib import Path

import streamlit as st
import streamlit.components.v1 as components


APP_DIR = Path(__file__).resolve().parent
WEB_APP = APP_DIR / "index.html"


def load_web_app() -> str:
    html = WEB_APP.read_text(encoding="utf-8")
    asset_dir = APP_DIR / "assets"
    for image_file in asset_dir.rglob("*.jpg"):
        relative_path = image_file.relative_to(APP_DIR).as_posix()
        encoded = base64.b64encode(image_file.read_bytes()).decode("ascii")
        html = html.replace(relative_path, f"data:image/jpeg;base64,{encoded}")
    return html

st.set_page_config(
    page_title="Τα μαθήματά μου",
    page_icon="📚",
    layout="wide",
    initial_sidebar_state="collapsed",
)

st.markdown(
    """
    <style>
    html, body, [data-testid="stAppViewContainer"], [data-testid="stMain"] {
        height: 100vh;
        height: 100dvh;
        overflow: hidden;
    }
    [data-testid="stHeader"], [data-testid="stToolbar"], footer {
        display: none !important;
    }
    [data-testid="stMainBlockContainer"] {
        width: 100%;
        max-width: none;
        height: 100vh;
        height: 100dvh;
        padding: 0 !important;
    }
    [data-testid="stMainBlockContainer"] [data-testid="stVerticalBlock"] {
        gap: 0 !important;
    }
    [data-testid="stMarkdownContainer"] {
        height: 0 !important;
        min-height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
    }
    [data-testid="stElementContainer"],
    [data-testid="stCustomComponentV1"] {
        width: 100%;
        height: 100%;
    }
    iframe {
        display: block;
        width: 100% !important;
        height: 100vh !important;
        height: 100dvh !important;
        border: 0;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

if not WEB_APP.is_file():
    st.error("Δεν βρέθηκε το αρχείο της εφαρμογής (index.html).")
    st.stop()

components.html(load_web_app(), height=1000, scrolling=True)
