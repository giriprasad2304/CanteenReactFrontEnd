import '../styles/Menu.css'

const Menu = () => {
    return (
        <div className="main-content">
            <div className="menu-header">
                <div className="search-bar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                    </svg>
                    <input type="text" placeholder="Search for food..." />
                </div>
                <div className="user-profile">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" strokeWidth="2">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <div className="user-info">
                        <span className="user-name">Alex Carter</span>
                        <div className="user-avatar"></div>
                    </div>
                </div>
            </div>

            <div className="menu-section">
                <div className="section-header">
                    <h3>Main Menu</h3>
                    <div className="filter-buttons">
                        <button className="filter-btn">Filters</button>
                        <button className="filter-btn recommended">Recommended</button>
                    </div>
                </div>

                <div className="Menu_row">
                    <div className="Menu_card">
                        <img src="../public/idly.jpg" alt="Idly" />
                        <span className="veg-label">VEG</span>
                        <div className="Menu_card_body">
                            <h3>Idly</h3>
                            <div className="card-rating">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="none">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                </svg>
                                <span>4.5</span>
                            </div>
                            <div className="Menu_card_footer">
                                <span className="price">₹20</span>
                                <button className="add-btn">Add To Cart</button>
                            </div>
                        </div>
                    </div>
                    <div className="Menu_card">
                        <img src="../public/idly.jpg" alt="Dosa" />
                        <span className="veg-label">VEG</span>
                        <div className="Menu_card_body">
                            <h3>Dosa</h3>
                            <div className="card-rating">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="none">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                </svg>
                                <span>4.7</span>
                            </div>
                            <div className="Menu_card_footer">
                                <span className="price">₹35</span>
                                <button className="add-btn">Add To Cart</button>
                            </div>
                        </div>
                    </div>
                    <div className="Menu_card">
                        <img src="../public/idly.jpg" alt="Vada" />
                        <span className="veg-label">VEG</span>
                        <div className="Menu_card_body">
                            <h3>Vada</h3>
                            <div className="card-rating">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="none">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                </svg>
                                <span>4.3</span>
                            </div>
                            <div className="Menu_card_footer">
                                <span className="price">₹15</span>
                                <button className="add-btn">Add To Cart</button>
                            </div>
                        </div>
                    </div>
                    <div className="Menu_card">
                        <img src="../public/idly.jpg" alt="Chicken Curry" />
                        <span className="non-veg-label">NON-VEG</span>
                        <div className="Menu_card_body">
                            <h3>Chicken Curry</h3>
                            <div className="card-rating">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="none">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                </svg>
                                <span>4.8</span>
                            </div>
                            <div className="Menu_card_footer">
                                <span className="price">₹120</span>
                                <button className="add-btn">Add To Cart</button>
                            </div>
                        </div>
                    </div>
                    <div className="Menu_card">
                        <img src="../public/idly.jpg" alt="Biryani" />
                        <span className="non-veg-label">NON-VEG</span>
                        <div className="Menu_card_body">
                            <h3>Biryani</h3>
                            <div className="card-rating">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="none">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                </svg>
                                <span>4.9</span>
                            </div>
                            <div className="Menu_card_footer">
                                <span className="price">₹180</span>
                                <button className="add-btn">Add To Cart</button>
                            </div>
                        </div>
                    </div>
                    <div className="Menu_card">
                        <img src="../public/idly.jpg" alt="Sambar" />
                        <span className="veg-label">VEG</span>
                        <div className="Menu_card_body">
                            <h3>Sambar</h3>
                            <div className="card-rating">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="none">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                </svg>
                                <span>4.4</span>
                            </div>
                            <div className="Menu_card_footer">
                                <span className="price">₹25</span>
                                <button className="add-btn">Add To Cart</button>
                            </div>
                        </div>
                    </div>
                    <div className="Menu_card">
                        <img src="../public/idly.jpg" alt="Rasam" />
                        <span className="veg-label">VEG</span>
                        <div className="Menu_card_body">
                            <h3>Rasam</h3>
                            <div className="card-rating">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="none">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                </svg>
                                <span>4.2</span>
                            </div>
                            <div className="Menu_card_footer">
                                <span className="price">₹20</span>
                                <button className="add-btn">Add To Cart</button>
                            </div>
                        </div>
                    </div>
                    <div className="Menu_card">
                        <img src="../public/idly.jpg" alt="Pongal" />
                        <span className="veg-label">VEG</span>
                        <div className="Menu_card_body">
                            <h3>Pongal</h3>
                            <div className="card-rating">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="none">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                </svg>
                                <span>4.6</span>
                            </div>
                            <div className="Menu_card_footer">
                                <span className="price">₹40</span>
                                <button className="add-btn">Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="view-more-section">
                    <button className="view-more-btn">
                        View More Delicacies
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Menu;