const GoogleMap = () => {
  return (
    <div className="w-full h-64 rounded-xl overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2664.5!2d-1.6790!3d48.1070!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480ede3b8c5d9a0f%3A0x4ce4e5b4e6e6e6e6!2s27%20Pl.%20du%20Colombier%2C%2035000%20Rennes%2C%20France!5e0!3m2!1sen!2sfr!4v1700000000000!5m2!1sen!2sfr"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="1988 Live Club Location"
      />
    </div>
  );
};

export default GoogleMap;
